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

module.exports = {
  logAuditAction,
};
