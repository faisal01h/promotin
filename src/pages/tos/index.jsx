import React from "react";
import { Line, Gap } from "../../components/atoms"
import "./tos.scss";

const TermsOfService = () => {

    return (
        <div className="tos-wrapper">
            
            <h1 className="tos-head-lead">Ketentuan Layanan</h1>
                
            <Line />
            <div className="tos-content">
                <span>Diperbarui 20 Juni 2021</span>
                <h2>I. Definisi</h2>
                <Gap height="7px" />
                <div>
                    <p>
                        <ol>
                            <li>Dalam ketentuan ini, akan ada dua pihak yang akan disebutkan yaitu Promotbox dan pengguna akhir.</li>
                            <li>Penggunaan kata "kami" merujuk pada Promotbox.</li>
                            <li>Penggunaan kata "anda" merujuk pada pengguna akhir.</li>
                        </ol>
                    </p>
                </div>
                <Gap height="7px" />
                <h2>II. Klausa Layanan</h2>
                <Gap height="7px" />
                <div>
                    <h3>A. Persyaratan Umur</h3>
                    <Gap height="5px" />
                    <p>
                        Untuk menggunakan layanan Promotbox, umur minimal pengguna yang diperlukan adalah 13 tahun.
                    </p>
                    <Gap height="7px" />
                    <h3>B. Hak Promotbox</h3>
                    <Gap height="5px" />
                    <p>
                        Meskipun kami memberikan izin kepada anda untuk menggunakan layanan kami, kami memiliki hak atas kekayaan intelektual yang terkandung dalam layanan ini. 
                        Promotbox berhak untuk menghapus akun dan konten yang dinilai menyalahi ketentuan layanan kami dan/atau kebijakan pemerintah setempat.
                    </p>
                    <Gap height="7px" />
                    <h3>C. Hak Pengguna</h3>
                    <Gap height="5px" />
                    <p>
                        Konten anda tetap milik anda, yang berarti segala hak dan kekayaan intelektual dalam konten anda tetap milik anda. Kami membutuhkan izin anda jika kami menggunakan konten anda untuk kepentingan apapun. Lisensi ini berlaku apabila konten tersebut dilindungi oleh hak atas kekayaan intelektual. Lisensi 
                        ini tetap mengizinkan Promotbox untuk menyimpan dan mendistribusikan konten anda.
                    </p>
                    <Gap height="7px" />
                    <h3>D. Ketentuan Konten</h3>
                    <Gap height="5px" />
                    <p>
                        Konten yang diizinkan untuk disebarkan melalui layanan Promotbox adalah konten yang merupakan acara yang akan dan/atau sedang diselenggarakan 
                        dan tidak melanggar aturan hukum setempat. Acara dapat berupa acara bersifat publik maupun pribadi. Konten tidak diperbolehkan untuk disebarkan atau diakses dengan penggunaan <i>script</i>, robot, <i>crawler</i>, perangkat otomasi lain, dan/atau eksploitasi terhadap antarmuka pemrograman aplikasi (API).

                        Kami berwenang untuk menghapus konten yang dinilai melanggar ketentuan kami, 
                        melanggar hak cipta, dan/atau kebijakan hukum yang berlaku di Republik Indonesia dan/atau wilayah pengguna.
                    </p>
                    <Gap height="7px" />
                    <h3>E. Batasan Tanggung Jawab</h3>
                    <Gap height="5px" />
                    <p>
                        Setiap isi dari konten pengguna yang diunggah melalui layanan kami merupakan tanggung jawab dari pengguna. Promotbox tidak bertanggung jawab atas isi dari konten yang disebarkan oleh pengguna. 
                        Setiap kerugian akibat kelalaian pengguna, peretasan oleh pihak ketiga terhadap akun pengguna, dan/atau gangguan layanan Promotbox bukan merupakan tanggung jawab Promotbox.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TermsOfService;