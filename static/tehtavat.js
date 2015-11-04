function kevennys(t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
}

function matriisiAsteet(tr) {
    var values = tr.split('(')[1];
    if (!values) { // Kääntämätőn
        return 0;
    }
        values = values.split(')')[0],
        values = values.split(', ');
        console.log("Ei.", tr, values);

    var a = values[0];
    var b = values[1];
    var c = values[2];
    var d = values[3];

    return Math.round(Math.atan2(b, a) * (180/Math.PI));
}

window.addEventListener("DOMContentLoaded", function() {
    var evasteet = Cookies.getJSON("tehdyt") || [];
    [].forEach.call(document.querySelectorAll(".tehtava"), function(tehtava) {
        var divAnimaatioTila = "sulkeutuu";
        var divAnimaatioFunktio;
        var divAnimaatioEteneminen = 0;

        function avaa() {
            var alkuKokoX = tehtava.querySelector(".tehty") && window.getScrollWidth(tehtava.querySelector(".tehty")) || 0;
            var alkuKokoY = tehtava.querySelector(".tehty") && window.getScrollHeight(tehtava.querySelector(".tehty")) || 0;
            var rotAlku = tehtava.querySelector(".tehty") && matriisiAsteet(window.getComputedStyle(tehtava.querySelector(".tehty")).getPropertyValue("transform")) || 0;
            var alkuX = tehtava.querySelector(".tehty") && parseInt(window.getComputedStyle(tehtava.querySelector(".tehty")).getPropertyValue("left")) || 0;
            var alkuY = tehtava.querySelector(".tehty") && parseInt(window.getComputedStyle(tehtava.querySelector(".tehty")).getPropertyValue("top")) || 0;

            if (!tehtava.querySelector(".tehty")) {
                var tehtyDiv = document.createElement("div");
                tehtyDiv.className = "tehty material-icons md-50";
                tehtyDiv.innerText = "check";
                tehtava.appendChild(tehtyDiv);
            }
            else {
                var tehtyDiv = tehtava.querySelector(".tehty");
            }
            divAnimaatioTila = divAnimaatioTila == "avautuu" ? "sulkeutuu" : "avautuu";

            if (divAnimaatioTila == "avautuu") {
                var loppuKokoX = 50, loppuKokoY = 50, rotLoppu = 360, aika = 1000;
                var loppuX = 0, loppuY = 0;
            }
            else {
                var loppuKokoX = 0, loppuKokoY = 0, rotLoppu = 0, aika = 1000;
                var loppuX = 25, loppuY = 25;
            }

            divAnimaatioFunktio = window.setInterval(function() {
                if (divAnimaatioEteneminen >= aika) {
                    console.log("Loppu.");
                    window.clearInterval(divAnimaatioFunktio);
                    tehtyDiv.style.height = parseInt(kevennys(aika, alkuKokoY, loppuKokoY - alkuKokoY, aika)) + "px";
                    tehtyDiv.style.width = parseInt(kevennys(aika, alkuKokoX, loppuKokoX - alkuKokoX, aika)) + "px";
                    tehtyDiv.style.top = parseInt(kevennys(aika, alkuY, loppuY - alkuY, aika)) + "px";
                    tehtyDiv.style.left = parseInt(kevennys(aika, alkuX, loppuX - alkuX, aika)) + "px";
                    return;
                }
                divAnimaatioEteneminen = divAnimaatioEteneminen + 16;
                tehtyDiv.style.height = parseInt(kevennys(divAnimaatioEteneminen, alkuKokoY, loppuKokoY - alkuKokoY, aika)) + "px";
                tehtyDiv.style.width = parseInt(kevennys(divAnimaatioEteneminen, alkuKokoX, loppuKokoX - alkuKokoX, aika)) + "px";
                tehtyDiv.style.transform = "rotate(" + parseInt(kevennys(divAnimaatioEteneminen, rotAlku, rotLoppu - rotAlku, aika)) + "DEG)";
                tehtyDiv.style.top = parseInt(kevennys(divAnimaatioEteneminen, alkuY, loppuY - alkuY, aika)) + "px";
                tehtyDiv.style.left = parseInt(kevennys(divAnimaatioEteneminen, alkuX, loppuX - alkuX, aika)) + "px";
            }, 16);
        }

        if (evasteet.indexOf(parseInt(tehtava.innerText)) > -1) {
            avaa();
        }
    });
});
