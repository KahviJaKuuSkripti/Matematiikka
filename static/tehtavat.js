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
        var divAnimaatioRotaatio = 0;

        function avaa() {
            divAnimaatioTila = divAnimaatioTila == "avautuu" ? "sulkeutuu" : "avautuu";
            if (divAnimaatioTila == "avautuu") {
                var loppuKokoX = 50, loppuKokoY = 50, rotLoppu = 360, aika = 1000;
                var loppuX = 0, loppuY = 0;
                if (tehtava.querySelector(".tehty")) {
                    var alkuX = tehtava.querySelector(".tehty").offsetLeft, alkuY = tehtava.querySelector(".tehty").offsetTop;
                }
                else {
                    var alkuX = 25, alkuY = 25;
                }
            }
            else {
                var loppuKokoX = 0, loppuKokoY = 0, rotLoppu = 0, aika = 1000;
                var loppuX = 25, loppuY = 25;
            }

            if (!tehtava.querySelector(".tehty")) {
                var alkuKokoX = 0;
                var alkuKokoY = 0;
                var rotAlku = 0;
                var tehtyDiv = document.createElement("div");
                tehtyDiv.className = "tehty material-icons md-50";
                tehtyDiv.innerText = "check";
                tehtava.appendChild(tehtyDiv);
            }
            else {
                var tehtyDiv = tehtava.querySelector(".tehty");
                var alkuKokoX = tehtava.querySelector(".tehty").scrollWidth;
                var alkuKokoY = tehtava.querySelector(".tehty").scrollWidth;
                var rotAlku = divAnimaatioRotaatio || 0;
                var alkuX = tehtava.querySelector(".tehty").offsetLeft;
                var alkuY = tehtava.querySelector(".tehty").offsetTop;

            }
            divAnimaatioEteneminen = 0;
            if (divAnimaatioFunktio) 
                window.clearInterval(divAnimaatioFunktio);

            divAnimaatioFunktio = window.setInterval(function() {
                if (divAnimaatioEteneminen >= aika) {
                    console.log("Loppu.");
                    window.clearInterval(divAnimaatioFunktio);
                    tehtyDiv.style.height = parseInt(kevennys(aika, alkuKokoY, loppuKokoY - alkuKokoY, aika)) + "px";
                    tehtyDiv.style.width = parseInt(kevennys(aika, alkuKokoX, loppuKokoX - alkuKokoX, aika)) + "px";
                    tehtyDiv.style.top = parseInt(kevennys(aika, alkuY, loppuY - alkuY, aika)) + "px";
                    tehtyDiv.style.left = parseInt(kevennys(aika, alkuX, loppuX - alkuX, aika)) + "px";
                    tehtyDiv.style.transform = "rotate(" + parseInt(kevennys(aika, rotAlku, rotLoppu - rotAlku, aika)) + "DEG)";
                    return;
                }
                divAnimaatioEteneminen = divAnimaatioEteneminen + 16;
                tehtyDiv.style.height = parseInt(kevennys(divAnimaatioEteneminen, alkuKokoY, loppuKokoY - alkuKokoY, aika)) + "px";
                tehtyDiv.style.width = parseInt(kevennys(divAnimaatioEteneminen, alkuKokoX, loppuKokoX - alkuKokoX, aika)) + "px";
                divAnimaatioRotaatio = parseInt(kevennys(divAnimaatioEteneminen, rotAlku, rotLoppu - rotAlku, aika));
                tehtyDiv.style.transform = "rotate(" + divAnimaatioRotaatio + "DEG)"
                tehtyDiv.style.top = parseInt(kevennys(divAnimaatioEteneminen, alkuY, loppuY - alkuY, aika)) + "px";
                tehtyDiv.style.left = parseInt(kevennys(divAnimaatioEteneminen, alkuX, loppuX - alkuX, aika)) + "px";
                tehtyDiv.style.lineHeight = parseInt(kevennys(divAnimaatioEteneminen, alkuKokoY, loppuKokoY - alkuKokoY, aika)) + "px";
                tehtyDiv.style.fontSize = parseInt(kevennys(divAnimaatioEteneminen, alkuKokoY, loppuKokoY - alkuKokoY, aika)) * .5 + "px";
            }, 16);
        }

        if (evasteet.indexOf(parseInt(tehtava.innerText)) > -1) {
            avaa();
        }

        tehtava.addEventListener("click", function() {
            avaa();
            if (evasteet.indexOf(parseInt(tehtava.innerText)) > -1) {
                evasteet.splice(evasteet.indexOf(parseInt(tehtava.innerText)), 1);
            }
            else {
                evasteet.push(parseInt(tehtava.innerText));
            }
            Cookies.remove("tehdyt");
            Cookies.set("tehdyt", evasteet);
        }, true);
    });
});
