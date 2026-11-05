const canvas = document.getElementById("flowerCanvas");
const ctx = canvas.getContext("2d");

const angleText = document.getElementById("angle");
const stageText = document.getElementById("stage");

const degreeSlider = document.getElementById("degreeSlider");
const degreeValue = document.getElementById("degreeValue");

const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");

const stages = [
    { name: "BLOOM", petals: 24, seeds: 900 },
    { name: "REWIND", petals: 18, seeds: 600 },
    { name: "SEED", petals: 0, seeds: 80 },
    { name: "SPROUT", petals: 6, seeds: 150 },
    { name: "GROWING", petals: 14, seeds: 450 },
    { name: "PERFECT", petals: 30, seeds: 1100 },
    { name: "BROKEN", petals: 35, seeds: 900 }
];

let currentStage = 0;
let selectedAngle = 137.5;
let rotation = 0;

function drawFlower() {

    ctx.clearRect(0, 0, 600, 600);

    const stage = stages[currentStage];

    const cx = 300;
    const cy = 300;

    // Background glow

    const glow = ctx.createRadialGradient(
        cx, cy, 10,
        cx, cy, 270
    );

    glow.addColorStop(0, "rgba(255,170,40,0.18)");
    glow.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 600, 600);

    // Flower petals

    for (let i = 0; i < stage.petals; i++) {

        const angle =
            (i * 2 * Math.PI / stage.petals) + rotation;

        const x = cx + Math.cos(angle) * 75;
        const y = cy + Math.sin(angle) * 75;

        ctx.save();

        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);

        const gradient = ctx.createLinearGradient(
            0, -55, 0, 55
        );

        gradient.addColorStop(0, "#fff9a6");
        gradient.addColorStop(0.5, "#ffc928");
        gradient.addColorStop(1, "#d97706");

        ctx.beginPath();

        ctx.ellipse(
            0, -25,
            15, 40,
            0, 0, Math.PI * 2
        );

        ctx.fillStyle = gradient;
        ctx.shadowColor = "#ffbd32";
        ctx.shadowBlur = 15;
        ctx.fill();

        ctx.restore();
    }

    // Sunflower center

    const center = ctx.createRadialGradient(
        cx - 20, cy - 20, 5,
        cx, cy, 85
    );

    center.addColorStop(0, "#9c5a16");
    center.addColorStop(0.5, "#57300e");
    center.addColorStop(1, "#180d08");

    ctx.beginPath();
    ctx.arc(cx, cy, 82, 0, Math.PI * 2);

    ctx.fillStyle = center;
    ctx.shadowColor = "#ffad32";
    ctx.shadowBlur = 20;
    ctx.fill();

    // Phyllotaxis seed pattern

    const goldenAngle = selectedAngle * Math.PI / 180;

    for (let i = 0; i < stage.seeds; i++) {

        const angle = i * goldenAngle + rotation;

        const radius = Math.sqrt(i) * 2.35;

        if (radius < 76) {

            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.beginPath();

            ctx.arc(
                x, y,
                1.5,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = i % 2 === 0
                ? "#e7aa42"
                : "#9d601e";

            ctx.fill();
        }
    }

    // Update information

    angleText.textContent = selectedAngle.toFixed(1) + "°";
    stageText.textContent = stage.name;
}

// Animation

function animate() {

    rotation += 0.0005;

    drawFlower();

    requestAnimationFrame(animate);
}

// Degree slider

degreeSlider.addEventListener("input", function () {

    selectedAngle = Number(this.value);

    degreeValue.textContent =
        selectedAngle.toFixed(1) + "°";

    drawFlower();
});

// Next stage

nextBtn.addEventListener("click", function () {

    currentStage++;

    if (currentStage >= stages.length) {
        currentStage = 0;
    }

    drawFlower();
});

// Reset

resetBtn.addEventListener("click", function () {

    currentStage = 0;

    selectedAngle = 137.5;

    rotation = 0;

    degreeSlider.value = 137.5;

    degreeValue.textContent = "137.5°";

    drawFlower();
});

// Start animation

degreeValue.textContent = "137.5°";

drawFlower();

animate();