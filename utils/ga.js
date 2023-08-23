const { google } = require('googleapis');
const analyticsreporting = google.analyticsreporting('v4');

// Google Analytics 인증 설정
function authenticate() {
  const jwt = new google.auth.JWT(
    process.env.GA_CLIENT_EMAIL, // 환경 변수에서 가져온 클라이언트 이메일
    null,
    process.env.GA_PRIVATE_KEY.replace(/\\n/g, '\n'), // 환경 변수에서 가져온 개인 키
    ['https://www.googleapis.com/auth/analytics.readonly'],
  );

  return jwt;
}

export async function getPageviews(startDate = '7daysAgo', endDate = 'today') {
  const auth = authenticate();

  const response = await analyticsreporting.reports.batchGet({
    auth: auth,
    requestBody: {
      reportRequests: [
        {
          viewId: process.env.GA_VIEW_ID, // 환경 변수에서 가져온 뷰 ID
          dateRanges: [
            {
              startDate: startDate,
              endDate: endDate,
            },
          ],
          metrics: [
            {
              expression: 'ga:pageviews',
            },
          ],
        },
      ],
    },
  });

  const result = response.data.reports[0].data.totals[0].values[0];
  return result;
}
