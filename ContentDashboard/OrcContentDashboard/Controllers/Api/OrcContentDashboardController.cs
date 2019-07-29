using OrcContentDashboard.Constants;
using OrcContentDashboard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Results;
using Umbraco.Web.WebApi;

namespace OrcContentDashboard.Controllers.Api
{
    public class ContentDashboardController : UmbracoAuthorizedApiController
    {
        public JsonResult<List<ContentSnapshot>> GetAllOldContent(int monthsBack = 6)
        {
            var oldContent = new List<ContentSnapshot>();
            var checkByDate = DateTime.Now.AddMonths(-monthsBack);

            var allContent = UmbracoContext.ContentCache.GetByXPath("/root//*[@id]");
            var allOldContent = allContent.Where(x => checkByDate >= x.UpdateDate);

            oldContent = allOldContent.Select(x => new ContentSnapshot
            {
                Url = x.Url,
                AdminUrl = $"/umbraco/#/content/content/edit/{x.Id}",
                CreateDate = x.CreateDate,
                UpdateDate = x.UpdateDate,
                Name = x.Name,
                LastEditor = x.WriterName
            })
            .OrderBy(x => x.UpdateDate)
            .ToList();

            return Json(oldContent, JsonSettings.Settings);
        }
    }
}
