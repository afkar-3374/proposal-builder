document.getElementById("proposalForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const items = document.getElementById("items").value;
  const totalAmount = document.getElementById("totalAmount").value;
  const date = document.getElementById("date").value;
  const submittedBy = document.getElementById("submittedBy").value;
  const phone = document.getElementById("phone").value;

  // For now, save items as text, later we can make PDF
  const proposalData = {
    title,
    description,
    fileUrl: `Items:\n${items}\n\nTotal: ${totalAmount}\nDate: ${date}\nBy: ${submittedBy}\nPhone: ${phone}`
  };

  try {
    const res = await fetch("http://localhost:5000/api/proposals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proposalData)
    });

    const data = await res.json();
    document.getElementById("message").textContent = "✅ Proposal submitted successfully!";
    document.getElementById("proposalForm").reset();
  } catch (err) {
    document.getElementById("message").textContent = "❌ Error submitting proposal!";
    console.error(err);
  }
});
