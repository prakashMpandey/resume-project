import {Schema,model} from "mongoose"

const templateSchema=new Schema({

    name:{
        type:String
    },
    category:{
        type:String
    },
    componentName:{
        type:String
    },
    thumbnail:{
        type:String
    },
    sections:[{
        type:String
    }]

})

const Template=model('Template',templateSchema);

export default Template;