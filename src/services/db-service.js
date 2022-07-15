class DbService {
  // little service to get the proper api url based on ENV
  getBaseUrl(){
    var url = window.location.href;
    if(url.includes('127.0.0.1') || url.includes('localhost')){
      return "http://127.0.0.1:3000/"
    }else{
      return "https://classique-mandarine-79234.herokuapp.com/"
    }
  }
}

export default new DbService();