import ApiUtils from "../utils/apiUtil";

export default {
  fetchRRSessions(id) {
    ApiUtils.apiService({
      url: "/api/club/" + id + "rrSessions",
      success: "fetchedRRSessions"
    })
  },
  fetchSession(date) {
    
  },
  saveSession(data, _csrf, adminId){
    ApiUtils.apiCSRFService({
      url: "/api/club/" + adminId,
      data: data,
      success: "savedRRSessions"
    }, _csrf)
  },

  deleteSession(id, clubId, _csrf){
    ApiUtils.apiCSRFService({

    }, _csrf)
  },

  finalizeResult(id, clubId, _csrf){
    ApiUtils.apiCSRFService({

    }, _csrf)
  }
}