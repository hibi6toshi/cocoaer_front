import { Link } from "react-router-dom";

const IndexPage = () => {
  return ( 
    <div className="
      md:mx-auto
      md:max-w-3xl
    ">
      <div className="my-10">
        <img src={`${process.env.PUBLIC_URL}/Cocoaer_logo.jpeg`} alt="index_logo" className="object-contain"/>
      </div>

      <div>
        <div className="p-10">
          <h2 className="font-bold h1 mt-20 mb-5 text-lg">Cocoaerについて</h2>
          <p className="mb-20">孝行をもっと身近に・手軽に・カジュアルに<br />
            Cocoaerは孝行に特化したSNSです。</p>
        </div>
        <hr className="mb-20"/>

        <div className="bg-slate-300 bg-opacity-20 p-10">
          <div className="grid grid-cols-2 mb-60">
            <div>
              <h2 className="font-bold mb-6">
                孝行したいけど何をすればいいかわからない？<br />
                ならばフォーラムで質問しましょう！
              </h2>
              <p className="mb-2">フォーラムではテーマを設定して他のユーザーに質問することができます。<br />
              </p>
              <Link to="/forums" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">フォーラムページへ</Link>
            </div>
            <img src={`${process.env.PUBLIC_URL}/undraw_having_fun_re_vj4h.svg`} alt="forum_explain_pic" className="ml-20 h-40 w-40"/>
          </div>
    
          <div className="grid grid-cols-2 mb-60">
            <img src={`${process.env.PUBLIC_URL}/undraw_task_re_wi3v.svg`} alt="project_explain_pic" className="ml-20 h-40 w-40"/>
            <div>
              <h2 className="font-bold mb-6">
                やることは決まったけど実施できるか不安？<br />
                プロジェクト機能でやることを管理しましょう！
              </h2>
              <p className="mb-2">タスクとメモを管理できます。<br />
                これで忘れませんね？
              </p>
              <Link to="/projects" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">プロジェクトページへ</Link>
            </div>
          </div>
    
          <div className="grid grid-cols-2 mb-30">
            <div>
              <h2 className="font-bold mb-6">
                実施できました？素晴らしい！！<br />
                ぜひCocoaerでシェアしてください！
              </h2>
              <p className="mb-2">あなたの孝行を投稿してください！<br />
                きっと誰かの孝行の助けとなります！
              </p>
              <Link to="/articles" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">孝行一覧ページへ</Link>
            </div>
            <img src={`${process.env.PUBLIC_URL}/undraw_grandma_re_rnv1.svg`} alt="article_explain_pic" className="ml-20 h-40 w-40"/>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default IndexPage;