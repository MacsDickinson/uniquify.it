using System.Web.Mvc;
using System.Web.Services;
using SecurePass.Models;

namespace SecurePass.Controllers
{
	public class HomeController : Controller
	{
		//
		// GET: /Home/

		public ActionResult Index()
		{
			return View();
		}
	}
}
