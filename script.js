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
        const canvas = this.dom.canvas.querySelector('canvas');
        
        if (canvas) {
            // Transformamos o canvas em um BLOB (objeto binário)
            canvas.toBlob((blob) => {
                // Criamos uma URL temporária para este objeto binário
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                
                link.href = url;
                link.download = `BULL_QR_${Date.now()}.png`;
                
                // Adicionamos ao DOM para garantir o disparo no mobile
                document.body.appendChild(link);
                link.click();
                
                // Limpeza de memória (importante para performance 2026)
                setTimeout(() => {
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }, 100);
            }, 'image/png');
        } else {
            console.error("Canvas não encontrado para download.");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => BullQR.init());