export const fetchInstitutions = async () => {
  try {
    const response = await fetch("/api/nordigen-institutions");
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to fetch institutions");
    }

    return data.institutions; 
  } catch (error) {
    console.error("Error fetching institutions:", error);
    throw error; 
  }
};
