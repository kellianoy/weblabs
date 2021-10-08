const data = {
    channels: [{
      id: '1',
      name: 'Channel 1',
    },{
      id: '2',
      name: 'Channel 2',
    },{
      id: '3',
      name: 'Channel 3',
    }]
}

module.exports = {
    list: function () {
        return data.channels;
    },

    get: function (id) {
        for( var i = 0; i < data.channels.length; i++ ) {
            if(data.channels[0].id== id ) {
                return data.channels[i];
	            break;
			}
		}
    }
}
