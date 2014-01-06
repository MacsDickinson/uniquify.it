using System;
using Uniquify.it.ViewModels;

namespace Uniquify.it.Tests
{
    using FluentAssertions;
    using Nancy;
    using Nancy.Testing;
    using Xunit;

    public class BaseModuleTestFixture
    {
        private readonly Browser _browser;
        public BaseModuleTestFixture()
        {
            // Arrange
            _browser = new Browser(new DefaultNancyBootstrapper());
        }

        [Fact]
        public void Get_root_should_return_200()
        {
            // Act
            var response = _browser.Get("/");
            // Assert
            response.StatusCode.ShouldBeEquivalentTo(HttpStatusCode.OK);
        }

        [Fact]
        public void IndexViewModel_year_is_current_year()
        {
            // Arrange
            var model = new IndexViewModel();

            // Assert
            model.Year.ShouldBeEquivalentTo(DateTime.Now.ToString("yyyy"));
        }

        //[Fact]
        //public void Get_sample_should_return_200()
        //{
        //    // Act
        //    var response = _browser.Get("/Sample");
        //    // Assert
        //    response.StatusCode.ShouldBeEquivalentTo(HttpStatusCode.OK);
        //}

        //[Fact]
        //public void Get_root_with_accept_json_should_return_json()
        //{
        //    // Act
        //    var actual = _browser.Get("/Sample", with => with.Accept("application/json"));
        //    var actualBody = actual.Body.DeserializeJson<SampleViewModel>();

        //    // Assert
        //    actualBody.Title.ShouldBeEquivalentTo("The Title");
        //    actualBody.Body.ShouldBeEquivalentTo("Sample Body");
        //}

        //[Fact]
        //public void Get_root_with_accept_html_should_return_view()
        //{
        //    // Act
        //    var actual = _browser.Get("/Sample", with => with.Accept("text/html"));

        //    // Assert
        //    actual.Body["title"]
        //        .ShouldContain("The Title");
        //    actual.Body["body"]
        //        .ShouldExistOnce()
        //        .And
        //        .ShouldContain("Sample Body");
        //}
    }
}
