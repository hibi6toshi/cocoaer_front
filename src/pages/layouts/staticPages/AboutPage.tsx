import { Link } from "react-router-dom";

const AboutPage = () => {
  return ( 
    <div className="
      md:mx-auto
      md:max-w-3xl
    ">
      <h1 className="font-bold h1 mt-20 mb-5 text-lg">Cocoaerについて</h1>
      <p className="mb-20">孝行をもっと身近に・手軽に・カジュアルに<br />Cocoaerは孝行に特化したSNSです。</p>
      <hr className="mb-20"/>

      <div className="grid grid-cols-2 mt-10">
        <div>
          <h2 className="font-bold mb-2">
            孝行したいけど何をすればいいかわからない？<br />
            ならばフォーラムで質問しましょう！
          </h2>
          <p className="mb-2">フォーラムではテーマを設定して他のユーザーに質問することができます。<br />
          </p>
          <Link to="/forums" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">フォーラムページへ</Link>
        </div>
        <img src={`${process.env.PUBLIC_URL}/undraw_having_fun_re_vj4h.svg`} alt="SVG" className="ml-20 h-40 w-40"/>
      </div>

      <div className="grid grid-cols-2 mt-20 ">
        <img src={`${process.env.PUBLIC_URL}/undraw_task_re_wi3v.svg`} alt="SVG" className="ml-20 h-40 w-40"/>
        <div>
          <h2 className="font-bold mb-2">
            やることは決まったけど実施できるか不安？<br />
            プロジェクト機能でやることを管理しましょう！
          </h2>
          <p className="mb-2">タスクとメモを管理できます。<br />
            これで忘れませんね？
          </p>
          <Link to="/projects" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">プロジェクトページへ</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-20 ">
        <div>
          <h2 className="font-bold mb-2">
            実施できました？素晴らしい！！<br />
            ぜひCocoaerでシェアしてください！
          </h2>
          <p className="mb-2">あなたの孝行を投稿してください！<br />
            きっと誰かの孝行の助けとなります！
          </p>
          <Link to="/articles" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">孝行一覧ページへ</Link>
        </div>
        <img src={`${process.env.PUBLIC_URL}/undraw_grandma_re_rnv1.svg`} alt="SVG" className="ml-20 h-40 w-40"/>
      </div>

    </div>
   );
}
 
export default AboutPage;