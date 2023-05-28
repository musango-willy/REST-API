//import all the necessary libraries
const express=
const jwt= 
const menu=
const dotenv=

//configure the environmental variables
dotenv.config()
//get the api key
const SECRET_KEY=//get the key from the environmental variables i.e. '.env file'
//create app
const app=express()

//getting the menu
app.get('/api/menu',(req,res)=>{
    
    res.status(200).json(menu)
})

//making an order 
//making an order as a verified customer
app.post('/api/order',verifyToken,(req,res)=>{
    //check for authentication
    jwt.verify( req.token,SECRET_KEY, (error,authData)=>{
        if(error) res.sendStatus();//send a forbidden status code
        else{
            //create javascript order object
            let order={
                //create properties
            }
            order.authData=authData
            res.writeHead(201,{'Content-Type':'application/json'})
            res.status(201).end(JSON.stringify(order))
        }
    } )
    
    
})

app.post('/api/login',(req,res)=>{
    //dummy user
    const person={
       //create properties
    }

    //generatin token with secret key
    jwt.sign({user:person},SECRET_KEY,{expiresIn:'40s'},(err,token)=>{
        res.json({token})
    })
})

function verifyToken(req,res,next){
    //get auth header value
    const bearerHeader=req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const bearer=bearerHeader.split(' ')
        const access_token=bearer[1]

        //set the token
        req.token=access_token
        //bring in the subsequent middleware
        next()
    }else res.sendStatus(403);//returns status of forbidden
}

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server running on port ${PORT}...`))