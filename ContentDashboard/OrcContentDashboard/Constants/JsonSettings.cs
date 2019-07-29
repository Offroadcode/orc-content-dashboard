using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace OrcContentDashboard.Constants
{
    public static class JsonSettings
    {
        public static JsonSerializerSettings Settings
        {
            get
            {
                return new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };
            }
        }
    }
}
