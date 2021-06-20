import React from "react";
import { Line, Gap } from "../../components/atoms"
import "./tos.scss";

const TermsOfService = () => {

    return (
        <div className="tos-wrapper">
            <h1>Ketentuan Layanan</h1>
            <Line />
            <div className="tos-content">
                <span>20 Juni 2021</span>
                <h2>I. Klausa Layanan</h2>
                <Gap height="7px" />
                <div>
                    <h3>A. Persyaratan Umur</h3>
                    <Gap height="5px" />
                    <p>
                        Untuk menggunakan layanan Promotbox, umur minimal yang diperlukan adalah 13 tahun.
                    </p>
                    <Gap height="7px" />
                    <h3>B. Hak Promotbox</h3>
                    <Gap height="5px" />
                    <p>
                        Meskipun kami memberikan izin kepada anda untuk menggunakan layanan kami, kami memiliki hak atas kekayaan intelektual yang terkandung dalam layanan ini. Promotbox berhak untuk menghapus akun yang dinilai menyalahi ketentuan layanan kami dan/atau kebijakan pemerintah setempat.
                    </p>
                    <Gap height="7px" />
                    <h3>C. Hak Pengguna</h3>
                    <Gap height="5px" />
                    <p>
                        Konten anda tetap milik anda, yang berarti segala hak dan kekayaan intelektual dalam konten anda tetap milik anda. Kami membutuhkan izin anda jika kami menggunakan konten anda untuk kepentingan apapun. Lisensi ini berlaku apabila konten tersebut dilindungi oleh hak atas kekayaan intelektual. Lisensi 
                        ini tetap mengizinkan Promotbox untuk menyimpan dan mendistribusikan konten anda.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TermsOfService;