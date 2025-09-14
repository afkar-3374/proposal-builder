// Base URL for live backend
const BASE_URL = "https://proposal-builder-sndn.onrender.com/api/proposals";

/* -------------------- INDEX PAGE -------------------- */
async function fetchProposals() {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    const container = document.getElementById("proposals-container");
    container.innerHTML = "";

    data.forEach((proposal) => {
      const card = document.createElement("div");
      card.classList.add("proposal-card");

      card.innerHTML = `
        <h3>${proposal.projectName}</h3>
        <p><strong>Submitted By:</strong> ${proposal.submittedBy}</p>
        <p><strong>Phone:</strong> ${proposal.phone}</p>
        <p><strong>Status:</strong> <span class="status-badge ${
          proposal.status === "approved" ? "status-approved" : "status-pending"
        }">${proposal.status}</span></p>
        <button class="view-btn" onclick='viewProposal(${JSON.stringify(
          proposal
        )})'>View</button>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error fetching proposals:", err);
  }
}

function viewProposal(proposal) {
  const modal = document.getElementById("proposal-modal");
  const content = document.getElementById("modal-content-body");

  content.innerHTML = `
    <h3>${proposal.projectName}</h3>
    <p><strong>About:</strong> ${proposal.about}</p>
    <p><strong>Submitted By:</strong> ${proposal.submittedBy}</p>
    <p><strong>Phone:</strong> ${proposal.phone}</p>
    <p><strong>Items:</strong></p>
    <ul>
      ${proposal.items.map((i) => `<li>${i.name} - ₹${i.cost}</li>`).join("")}
    </ul>
    <p><strong>Total Amount:</strong> ₹${proposal.totalAmount}</p>
    <p><strong>Status:</strong> ${proposal.status}</p>
  `;

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("proposal-modal").style.display = "none";
}

/* -------------------- ADMIN PAGE -------------------- */
async function fetchProposalsAdmin() {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();

    const tableBody = document.getElementById("admin-table-body");
    tableBody.innerHTML = "";

    data.forEach((proposal) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${proposal.projectName}</td>
        <td>${proposal.submittedBy}</td>
        <td>${proposal.phone}</td>
        <td>${proposal.status}</td>
        <td>
          <button class="view-btn" onclick='viewProposal(${JSON.stringify(
            proposal
          )})'>View</button>
          <button class="approve-btn" onclick='approveProposal("${proposal._id}")'>Approve</button>
          <button class="delete-btn" onclick='deleteProposal("${proposal._id}")'>Delete</button>
        </td>
      `;

      tableBody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error fetching admin proposals:", err);
  }
}

async function approveProposal(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}/approve`, { method: "PATCH" });
    if (res.ok) fetchProposalsAdmin();
  } catch (err) {
    console.error("Error approving proposal:", err);
  }
}

async function deleteProposal(id) {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (res.ok) fetchProposalsAdmin();
  } catch (err) {
    console.error("Error deleting proposal:", err);
  }
}

/* -------------------- INITIALIZE -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("proposals-container")) fetchProposals();
  if (document.getElementById("admin-table-body")) fetchProposalsAdmin();
});
