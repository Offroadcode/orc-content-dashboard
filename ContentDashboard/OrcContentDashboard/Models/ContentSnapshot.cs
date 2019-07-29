using System;

namespace OrcContentDashboard.Models
{
    public class ContentSnapshot
    {
        public DateTime CreateDate { get; set; }

        public DateTime UpdateDate { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public string AdminUrl { get; set; }

        public string LastEditor { get; set; }
    }
}
