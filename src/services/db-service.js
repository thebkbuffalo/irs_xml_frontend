class DbService {
  getBaseUrl(){
    var url = window.location.href;
    if(url.includes('127.0.0.1') || url.includes('localhost')){
      return "http://127.0.0.1:3000/"
    }else{
      // here will be deployed url
    }
  }
}

export default new DbService();