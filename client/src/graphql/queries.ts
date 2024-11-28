import { gql } from '@apollo/client';

export const GET_PATIENTS = gql`
  query GetPatients($clinicName: String) {
    patients(page: 1, limit: 10, clinicName: $clinicName) {
      totalPages
      patients {
        id
        firstName
        lastName
        dateOfBirth
        clinicId
        clinic {
          id
          name
        }
      }
    }
  }
`;

export const GET_CLINICS = gql`
  query GetClinics {
    clinics(page: 1, limit: 10) {
      clinics {
        id
        name
      }
    }
  }
`;
