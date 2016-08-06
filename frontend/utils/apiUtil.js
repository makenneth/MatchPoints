import { deletedRRSession, fetchedRRSessions, fetchedRRSession,
				 loggedIn, fetchedPlayers, fetchedPlayer,
				 updatedPlayer, removedPlayer } from "../actions/serverActions"
const getCSRF = () => {
	const els = document.getElementsByTagName("meta");
	for (let i = 0; i < els.length; i++) {
		if (els[i].getAttribute("name") === "csrf-token") {
			return els[i].getAttribute("content");
		}
	}
}

export const apiService = (options) => {
		$.ajax({
			method: options["method"] || "GET",
			url: options["url"],
			data: options["data"] || {},
			success: function(data){
				eval(options["success"])(data);
			},
			error: (error) => {
				options["error"] = options["error"] || "e => console.log(e)";
				eval(options["error"])(error);
			}
		})
	}
export const apiCSRFService = (options) => {
		$.ajax({
			method: options["method"] || "GET",
			url: options["url"],
			data: options["data"] || {},
			headers: {
				'X-CSRF-TOKEN': getCSRF()
			},
			success: function(data){
				eval(options["success"])(data);
			},
			error: (error) => {
				options["error"] = options["error"] || "e => console.log(e)";
				eval(options["error"])(error);
			}
		})
	}


