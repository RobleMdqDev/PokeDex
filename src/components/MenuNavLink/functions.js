export const scrollFunction = () => {
    const navbar = document.getElementById("navbar");
    const sticky = 0;
    if (document.getElementById("navbar")) {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        navbar.classList.add("glass");
        document.getElementById("navbar").style.padding = "15px 10px";
        document.getElementById("navList").style.fontSize = "20px";
      } else {
        document.getElementById("navbar").style.padding = "45px 10px";
        navbar.classList.remove("glass");

        document.getElementById("navList").style.fontSize = "25px";
      }
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }
  };
