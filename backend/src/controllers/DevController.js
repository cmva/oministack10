const axios = require('axios');
const Dev = require("../models/Dev");
const parseStringAsArray = require('../utils/parseStringasArray');
const { findConnections, sendMessage } = require('../websockets');

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(req, res) {
        //console.log(req.body);
        const { github_username, techs, latitude, longitude } = req.body;
        
        let dev = await Dev.findOne({github_username})

        if (!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            //console.log(apiResponse.data);
            const {name = login, avatar_url, bio} = apiResponse.data;
        
            const techArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates : [longitude, latitude],
            };
            //cadastra dev
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techArray,
                location,
            })

            //Filter Connections: 10k distance from dev, 
            //dev with one of the tecnologies
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }
        return res.json(dev);
    },
};