public class JSONParser {
    @AuraEnabled
    public static List<JSONWrapper> parseJSONResponse(){
        Http httpProtocol = new Http();
        HttpRequest request = new HttpRequest();
        String endpoint = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json';
        request.setEndpoint(endpoint);
        request.setMethod('GET');
        HttpResponse response = httpProtocol.send(request);
        System.debug('myResponse'+response.getBody());
        List<JSONWrapper> jsonWrapperList = (List<JSONWrapper>)JSON.deserialize(response.getBody(), List<JSONWrapper>.class);
        return jsonWrapperList;
    }
    
    public class JSONWrapper{
        
        @AuraEnabled public string id;
        @AuraEnabled public string creditorName;
        @AuraEnabled public string firstName;
        @AuraEnabled public string lastName;
        @AuraEnabled public decimal minPaymentPercentage;
        @AuraEnabled public decimal balance;
    }

}