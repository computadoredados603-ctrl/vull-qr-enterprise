"use strict";

const BullQR = {
    init() {
        this.dom = {
            input: document.querySelector('#user-input'),
            btnGen: document.querySelector('#generate-btn'),
            btnDown: document.querySelector('#download-btn'),
            result: document.querySelector('#result-container'),
            canvas: document.querySelector('#qrcode-canvas'),
        };
        this.events();
    },

    events() {
        this.dom.btnGen.addEventListener('click', () => this.generate());
        this.dom.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.generate();
        });
        this.dom.btnDown.addEventListener('click', () => this.download());
    },

    generate() {
        const val = this.dom.input.value.trim();
        
        if (!val) {
            this.dom.input.style.borderColor = "#ef4444";
            return;
        }

        // Reset visual e limpeza
        this.dom.canvas.innerHTML = "";
        this.dom.input.style.borderColor = "rgba(255, 255, 255, 0.1)";

        try {
            new QRCode(this.dom.canvas, {
                text: val,
                width: 250,
                height: 250,
                colorDark: "#0f172a",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            
            this.dom.result.classList.remove('hidden');
        } catch (e) {
            console.error("Erro na geração técnica:", e);
        }
    },

    download() {
        const img = this.dom.canvas.querySelector('img');
        const canvas = this.dom.canvas.querySelector('canvas');
        
        // Prioriza o src da imagem gerada pela lib qrcodejs
        const dataURL = img ? img.src : (canvas ? canvas.toDataURL() : null);

        if (dataURL) {
            const link = document.createElement('a');
            link.download = `BULL_QR_${Date.now()}.png`;
            link.href = dataURL;
            link.click();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => BullQR.init());