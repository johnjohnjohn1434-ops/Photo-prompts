async function loadAds() {
  try {
    const res = await fetch("ads.json?" + Date.now());
    const ad = await res.json();

    if (!ad.active) return;

    const popup = document.getElementById("popupOverlay");
    if (!popup) return;

    popup.style.display = "flex";

    const video = popup.querySelector("video");
    video.src = ad.video;

    document.getElementById("installAppBtn").onclick = () => {
        window.location.href = ad.installLink;
    };

    let sec = ad.duration;
    const txt = document.getElementById("countdownText");
    const close = document.getElementById("closePopup");

    close.style.display = "none";
    txt.innerText = `You can close this ad in ${sec} seconds`;

    const timer = setInterval(() => {
        sec--;
        if (sec > 0) {
            txt.innerText = `You can close this ad in ${sec} seconds`;
        } else {
            clearInterval(timer);
            txt.innerText = "You can now close this ad";
            close.style.display = "block";
        }
    }, 1000);

  } catch (e) {
    console.log(e);
  }
}

window.addEventListener("load", loadAds);
