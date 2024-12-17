import axios from 'axios';

export const uploadMedicalDocument = async (token: string, file: any, description: string) => {
    const formData = new FormData();
    formData.append('document_file', {
        uri: file.uri,
        type: file.type,
        name: file.fileName || 'document.jpg',
    });

    formData.append('description', description);

    const response = await axios.post(
        'https://technlogics.co/api/upload-medical-document',
        formData,
        {
            headers: {
                'Authorization': `Token ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response.data;
};

