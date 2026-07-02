const formatNotificationResponse = (n) => ({
  id: n.id,
  user_id: n.user_id,
  title: n.title,
  message: n.message,
  is_read: n.is_read,
  created_at: n.created_at,
});

const formatNotificationListResponse = (list) => list.map(formatNotificationResponse);

const formatPaginatedResponse = (data, total, page, limit) => ({
  data: formatNotificationListResponse(data),
  meta: {
    total,
    page,
    limit,
    total_pages: Math.ceil(total / limit),
  },
});

module.exports = { formatNotificationResponse, formatNotificationListResponse, formatPaginatedResponse };
