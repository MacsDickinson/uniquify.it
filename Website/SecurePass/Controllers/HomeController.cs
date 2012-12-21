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
			return View(new PassCode());
		}

		[HttpPost]
		public ActionResult Index(PassCode model)
		{
			model.SecurePass = GeneratePassword(model.ServiceName, model.Key);
			return View(model);
		}

		[WebMethod]
		[HttpPost]
		public string Get(string key, string value)
		{
			return GeneratePassword(value, key);
		}
		[WebMethod]
		public string Get()
		{
			return GeneratePassword("Mother", "Fucker");
		}

		public string GeneratePassword(string product, string key)
		{
			int prodLength = product.Length;
			char[] cProd = product.PadLeft(3, '0').ToCharArray();
			char[] cName = key.PadLeft(3, '0').ToCharArray();

			return string.Format("{0}{1}{2}{3}{4}{5}{6}{7}{8}", cProd[0], cProd[1], cName[0], cName[1], prodLength, cName[2], cName[3], cProd[2], cProd[3]);
		}
	}
}
