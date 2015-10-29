function kevennys(t, b, c, d) {
    return -c *(t/=d)*(t-2) + b;
}

function matriisiAsteet(tr) { // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
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

window.addEventListener("load", function() {
    [].forEach.call(document.querySelectorAll(".avain"), function(avain) {
        var piiloDiv = document.querySelector("#" + avain.dataset.piiloDiv);
        var divAnimaatioTila = "sulkeutuu";
        var divAnimaatioFunktio;
        var divAnimaatioEteneminen = 0;

        avain.addEventListener("click", function(evt) {
            evt.preventDefault(); 
            evt.stopPropagation();

            divAnimaatioTila = divAnimaatioTila == "avautuu" ? "sulkeutuu" : "avautuu";
            divAnimaatioEteneminen = 0;
            window.clearInterval(divAnimaatioFunktio);

            var alku = parseInt(window.getComputedStyle(piiloDiv).getPropertyValue('height'), 10);
            var rotAlku = matriisiAsteet(window.getComputedStyle(avain.querySelector(".material-icons")).getPropertyValue('transform'), 10) || 0;
            if (divAnimaatioTila == "avautuu") {
                var loppu = piiloDiv.scrollHeight, aika = 1000; // Onneksi tämä toimii!
                var rotLoppu = 180;
            }
            else {
                var loppu = 0, aika = 1000;
                var rotLoppu = 0;
            }

            divAnimaatioFunktio = window.setInterval(function() {
                if (divAnimaatioEteneminen >= aika) { 
                    window.clearInterval(divAnimaatioFunktio);
                    piiloDiv.style.height = parseInt(kevennys(aika, alku, loppu - alku, aika)) + "px";
                }
                divAnimaatioEteneminen = divAnimaatioEteneminen + 16;
                piiloDiv.style.height = parseInt(kevennys(divAnimaatioEteneminen, alku, loppu - alku, aika)) + "px";
                avain.querySelector(".material-icons").style.transform = "rotate(" + parseInt(kevennys(divAnimaatioEteneminen, rotAlku, rotLoppu - rotAlku, aika)) + "DEG)";
            }, 16);
        }, false);
    });
});
