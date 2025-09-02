
class ApiResponse{
   constructor(statusCode,data=null,message=""){
    this.statusCode=statusCode
    this.data=data
    this.message=message
    this.success=statusCode <400 ?true :false
   }
}


export default ApiResponse;