
import { insforge } from '../insforge';

export interface PatientProfileData {
    id: string;
    names: string;
    surnames: string;
    dni: string;
    phone: string;
    email: string; // from auth.users or profiles if stored
    avatar_url?: string;
    birth_date?: string;
    gender?: string;
    address?: string;
    blood_type?: string;
    allergies?: string[];
    emergency_contact?: {
        name: string;
        phone: string;
        relation: string;
    };
    notification_prefs?: {
        sms24h: boolean;
        wa2h: boolean;
        emailExams: boolean;
    };
}

export const PatientService = {
    /**
     * Get full patient profile (merging profile + patient data)
     */
    async getProfile(userId: string): Promise<{ data: PatientProfileData | null; error: any }> {
        try {
            // 1. Get Base Profile
            const { data: profile, error: profileError } = await insforge.database
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (profileError) throw profileError;
            if (!profile) return { data: null, error: 'Profile not found' };

            // 2. Get Patient Specific Data
            const { data: patient, error: patientError } = await insforge.database
                .from('patients')
                .select('*')
                .eq('id', userId)
                .single();

            // It's possible patient record doesn't exist yet, so we handle that gracefully
            const patientData = patient || {};

            // 3. Merge data
            const fullProfile: PatientProfileData = {
                id: profile.id,
                names: profile.names || '',
                surnames: profile.surnames || '',
                dni: profile.dni || '',
                phone: profile.phone || '',
                email: '', // Should fetch from auth context or separate call if needed, or store in profiles
                avatar_url: profile.avatar_url,
                // Patient specific
                birth_date: patientData.birth_date,
                gender: patientData.gender,
                address: patientData.address,
                blood_type: patientData.blood_type,
                allergies: patientData.allergies,
                emergency_contact: patientData.emergency_contact,
                notification_prefs: profile.notification_prefs
            };

            return { data: fullProfile, error: null };
        } catch (err) {
            console.error('Error fetching patient profile:', err);
            return { data: null, error: err };
        }
    },

    /**
     * Update patient profile (handles both tables)
     */
    async updateProfile(userId: string, data: Partial<PatientProfileData>): Promise<{ success: boolean; error: any }> {
        try {
            // Split data into profile vs patient fields
            const profileFields: any = {};
            const patientFields: any = {};

            if (data.names !== undefined) profileFields.names = data.names;
            if (data.surnames !== undefined) profileFields.surnames = data.surnames;
            if (data.dni !== undefined) profileFields.dni = data.dni;
            if (data.phone !== undefined) profileFields.phone = data.phone;
            if (data.avatar_url !== undefined) profileFields.avatar_url = data.avatar_url;
            if (data.notification_prefs !== undefined) profileFields.notification_prefs = data.notification_prefs;

            if (data.birth_date !== undefined) patientFields.birth_date = data.birth_date;
            if (data.gender !== undefined) patientFields.gender = data.gender;
            if (data.address !== undefined) patientFields.address = data.address;
            if (data.blood_type !== undefined) patientFields.blood_type = data.blood_type;
            if (data.allergies !== undefined) patientFields.allergies = data.allergies;
            if (data.emergency_contact !== undefined) patientFields.emergency_contact = data.emergency_contact;

            const updates = [];

            // Update Profiles Table
            if (Object.keys(profileFields).length > 0) {
                updates.push(
                    insforge.database.from('profiles').update(profileFields).eq('id', userId)
                );
            }

            // Update/Upsert Patients Table
            if (Object.keys(patientFields).length > 0) {
                // Check if patient record exists first or use upsert if supported/configured
                const { data: existing } = await insforge.database.from('patients').select('id').eq('id', userId).single();

                if (existing) {
                    updates.push(insforge.database.from('patients').update(patientFields).eq('id', userId));
                } else {
                    updates.push(insforge.database.from('patients').insert({ id: userId, ...patientFields }));
                }
            }

            await Promise.all(updates);
            return { success: true, error: null };
        } catch (err) {
            console.error('Error updating profile:', err);
            return { success: false, error: err };
        }
    }
};
