const PostUsers = require('../models/postUsersModel')



const postUserController = {

    addPost : async(req, res)=>{
        let { description, hashTags, userApp } = req.body
        let postUserCreated
        let like = []
    

        try {

            if(req.file){
                postUserCreated = await new PostUsers(req.body)
                const { filename } = req.file
                postUserCreated.like = like
                postUserCreated.setImgUrl(filename)
                postUserCreated.save()
            }
            res.status(201).json({
                response: postUserCreated,
                message: 'Post created',
                success: true
            })
            
            

        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                succes: false
            })
        }

    },
    readAllPost: async (req, res)=>{


        try {

            let allPosts = await PostUsers.find()
            .populate('user', {name:1})
            
            res.status(200).json({
                message: "Posts",
                response: allPosts,
                success: true
            })
        } catch (error) {
            console.log(error)
            res.status(500).json()
        }


    },
    deletePost: async(req, res)=>{
        const { id } = req.params 
        
        try {
            let post = await PostUsers.findOne({_id: id})

            if(!post){
                res.status(404).json({
                    message: 'Post Not Found , cannot be Deleted',
                    success: false
                })
            } else {
                let postDeleted = await PostUsers.findByIdAndDelete(id)
                res.status(200).json({
                    message: postDeleted.description + ': Has Been Deleted',
                    success: true
                })
            }

        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: error.message,
                success: false
            })
        } 
    }


}

module.exports = postUserController;