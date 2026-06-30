const prisma = require("../config/db");

const logAuditAction = async (userId, action, tableName, recordId) => {
  try {
    await prisma.audit_logs.create({
      data: {
        user_id: userId || null,
        action,
        table_name: tableName || null,
        record_id: recordId || null,
      },
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
  }
};

async function logDonationAudit(userId, donationId, action, details = {}) {
  try {
    await prisma.donation_audit.create({
      data: {
        user_id: userId || null,
        donation_id: donationId || null,
        action,
        details: JSON.stringify(details),
      },
    });
  } catch (error) {
    console.error("Failed to write donation audit log:", error);
  }
}

module.exports = {
  logAuditAction,
  logDonationAudit,
};
