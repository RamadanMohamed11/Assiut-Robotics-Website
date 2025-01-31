import Papa from 'papaparse';

export interface TeamMember {
  name: string;
  role: string;
  about: string;
  as: string;
  imageLink: string;
  linkedinLink?: string;
  email?: string;
  github?: string;
  portfolio?: string;
  whatsappLink?: string;
  isHead?: boolean;
}

export const fetchTeamData = async (): Promise<TeamMember[]> => {
  try {
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/1cBiANz0vm_66zcg5Xd9BLiOCrmYAvB8IeZ1Jeqn6dAc/gviz/tq?tqx=out:csv&timestamp=${Date.now()}`
    );
    const text = await response.text();
    
    return new Promise((resolve) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const members = results.data.map((row: any) => ({
            name: row['Name'],
            role: row['Role'],
            about: row['About'],
            as: row['As'],
            imageLink: row['Image Link'],
            linkedinLink: row['Linkedin Link'],
            email: row['Email'],
            github: row['github'],
            portfolio: row['Portfolio'],
            whatsappLink: row['Whatsapp Link'],
            isHead: row['As'] === 'Head'
          }));
          resolve(members);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching team data:', error);
    return [];
  }
};