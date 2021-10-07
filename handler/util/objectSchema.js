module.exports = {

        joinRoomValid : function(data){
                const requiredKeys = ['uid','nickname','type','position'];

                return requiredKeys.every(key => Object.keys(data).includes(key));
        },

        avatarActionValid : function(data){
                const requiredKeys = ['uid','type','position'];

                return requiredKeys.every(key => Object.keys(data).includes(key));
        },

        exitRoomValid : function(data){
                const requiredKeys = ['uid'];

                return requiredKeys.every(key => Object.keys(data).includes(key));
        },

	gimmickValid : function(data){
		const requiredKeys = ['uid','index','type']

		return requiredKeys.every(key => Object.keys(data).includes(key));
	},

	requestChatValid : function(data){
                const requiredKeys = ['uid','nickname','receiverUid']

                return requiredKeys.every(key => Object.keys(data).includes(key));
	},

        requestChatConfirmValid : function(data){
                const requiredKeys = ['uid','requestID','attend']

                return requiredKeys.every(key => Object.keys(data).includes(key));
        },

	openChatValid : function(data){
                const requiredKeys = ['uid','receiverUid']

                return requiredKeys.every(key => Object.keys(data).includes(key));
	},

        closeChatValid : function(data){
                const requiredKeys = ['uid','channelName']

                return requiredKeys.every(key => Object.keys(data).includes(key));
        },

	webRTCOfferValid : function(data){
                const requiredKeys = ['uid','receiverUid','offerSDP']

                return requiredKeys.every(key => Object.keys(data).includes(key));
	},

	webRTCAnswerValid : function(data){
                const requiredKeys = ['uid','receiverUid','answerSDP']

                return requiredKeys.every(key => Object.keys(data).includes(key));
	},

	webRTCCandidateValid : function(data){
                const requiredKeys = ['uid','receiverUid','candidates']

                return requiredKeys.every(key => Object.keys(data).includes(key));
	}

}
