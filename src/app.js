const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const env = require("./config/env");
const logger = require("./config/logger");
const errorHandler = require("./middleware/error.middleware");

const authRouter = require("./modules/auth/auth.routes");
const usersRouter = require("./modules/users/users.routes");
const beneficiariesRouter = require("./modules/beneficiaries/beneficiaries.routes");
const donorsRouter = require("./modules/donors/donors.routes");
const organizationsRouter = require("./modules/organizations/organizations.routes");
const aidCategoriesRouter = require("./modules/aid-categories/aid-categories.routes");
const aidTypesRouter = require("./modules/aid-types/aid-types.routes");
const aidsRouter = require("./modules/aids/aids.routes");
const campaignsRouter = require("./modules/campaigns/campaigns.routes");
const distributionCyclesRouter = require("./modules/distribution-cycles/distribution-cycles.routes");
const distributionsRouter = require("./modules/distributions/distributions.routes");
const donationsRouter = require("./modules/donations/donations.routes");
const donationTrackingRouter = require("./modules/donation-tracking/donation-tracking.routes");
const beneficiaryVerificationsRouter = require("./modules/beneficiary-verifications/beneficiary-verifications.routes");
const complaintsRouter = require("./modules/complaints/complaints.routes");
const notificationsRouter = require("./modules/notifications/notifications.routes");
const reportsRouter = require("./modules/reports/reports.routes");
const auditLogsRouter = require("./modules/audit-logs/audit-logs.routes");
const syncRouter = require("./modules/sync/sync.routes");
const testerRouter = require("./modules/tester/tester.routes");
const pickupLocationsRouter = require("./modules/pickup-locations/pickup-locations.routes");
const beneficiaryOrdersRouter = require("./modules/beneficiary-orders/beneficiary-orders.routes");
const beneficiaryAidsRouter = require("./modules/beneficiary-aids/beneficiary-aids.routes");
const governoratesRouter = require("./modules/governorates/governorates.routes");
const areasRouter = require("./modules/areas/areas.routes");


const app = express();



app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later. yousef" },
});
app.use(limiter);



app.use("/api/distributions", distributionsRouter);
app.use("/api/donations", donationsRouter);
app.use("/api/donation-tracking", donationTrackingRouter);
app.use("/api/beneficiary-verifications", beneficiaryVerificationsRouter);
app.use("/api/complaints", complaintsRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/reports", reportsRouter);
app.use("/api/audit-logs", auditLogsRouter);
app.use("/api/sync", syncRouter);

app.use("/tester", testerRouter);

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/beneficiaries", beneficiariesRouter);
app.use("/api/beneficiary-orders", beneficiaryOrdersRouter);
app.use("/api/donors", donorsRouter);
app.use("/api/organizations", organizationsRouter);
app.use("/api/aid-categories", aidCategoriesRouter);
app.use("/api/aid-types", aidTypesRouter);
app.use("/api/aids", aidsRouter); 
app.use("/api/campaigns", campaignsRouter);
app.use("/api/distribution-cycles", distributionCyclesRouter);
app.use("/api/pickup-locations", pickupLocationsRouter);
app.use("/api/beneficiary-aids", beneficiaryAidsRouter);
app.use("/api/governorates", governoratesRouter);
app.use("/api/areas", areasRouter);
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});


app.use(errorHandler);

const server = app.listen(env.PORT, () => {
  logger.info(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});

module.exports = app;

