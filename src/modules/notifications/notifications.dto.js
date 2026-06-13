const formatNotificationResponse = (n) => ({
  id: n.id,
  user_id: n.user_id,
  title: n.title,
  message: n.message,
  is_read: n.is_read,
  created_at: n.created_at
});

const formatNotificationListResponse = (list) => list.map(formatNotificationResponse);

module.exports = { formatNotificationResponse, formatNotificationListResponse };
