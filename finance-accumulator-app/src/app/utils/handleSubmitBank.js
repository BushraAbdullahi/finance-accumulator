export const handleSubmitBank = async (selectedBank) => {
  if (!selectedBank) {
    throw new Error("Please select a bank");
  }

  try {
    const response = await fetch("/api/nordigen-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        institutionId: selectedBank,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to initiate bank session");
    }

    return data;
  } catch (error) {
    console.error("Error initiating bank session:", error);
    throw error;
  }
};
