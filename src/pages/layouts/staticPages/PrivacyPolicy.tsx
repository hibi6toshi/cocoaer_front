const PrivacyPolicy = () => {
  return (
    <div className="
      md:mx-auto
      md:max-w-2xl
    ">
      <h1 className="font-bold h1 mt-10 mb-3 text-lg">プライバシーポリシー</h1>

      <p className="mb-10">
        cocoaer 運営（以下、「運営」といいます。）は、本ウェブサイト上で提供するサービス（以下,「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
      </p>
     
      <hr className="mb-12"/>

      <h2 className="font-bold h2 mb-3">お客様から取得する情報</h2>
      <p className="mb-3">
        運営はサービスの利用にあたり、お客様から以下の情報を取得します。
      </p>
      <ol className="list-decimal list-inside ml-3 mb-3">
        <li>氏名（ニックネームやペンネームも含む）</li>
        <li>メールアドレス</li>
        <li>外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報</li>
        <li>その他当サービスが定める入力フォームにお客様が入力する情報</li>
        <li>写真や動画</li>
      </ol>

      <h2 className="font-bold h2 mb-3">お客様の情報を利用する目的</h2>
      <p className="mb-3">
        本サービスは、お客様から取得した情報を、以下の目的のために利用します。
      </p>
      <ol className="list-decimal list-inside ml-3 mb-3">
        <li>本サービスに関する登録の受付、お客様の本人確認、認証のため</li>
        <li>お客様の本サービスの利用履歴を管理するため</li>
        <li>本サービスにおけるお客様の行動履歴を分析し、本サービスの維持改善に役立てるため</li>
        <li>お客様からのお問い合わせに対応するため</li>
        <li>本サービスの利用規約や法令に違反する行為に対応するため</li>
        <li>本サービスの変更、提供中止、終了、契約解除を連絡するため</li>
        <li>本サービス規約の変更等を通知するため</li>
        <li>以上の他、管理者サービスの提供、維持、保護及び改善のため</li>
      </ol>

      <h2 className="font-bold h2 mb-3">第三者提供</h2>
      <p className="mb-3">
        お客様からお預かりした個人情報を、個人情報保護法その他の法令に基づき開示が認められる場合を除き、お客様ご本人の同意を得ずに第三者に提供することはありません。
      </p>

      <h2 className="font-bold h2 mb-3">プライバシーポリシーの変更</h2>
      <p className="mb-3">
        本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
      </p>
      <p className="mb-3">
        当方が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
      </p>

      <p className="my-10 text-end">2023年01月12日 制定</p>

      <hr className="mb-10"/>
      <h2 className="font-bold h2 mb-3">お問い合わせ窓口</h2>
      <p className="mb-3">
        本ポリシーに関するお問い合わせは、以下のお問合せフォームまでお願いいたします。
        <br />
        <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdILzYJlYs6joZEZwRSNB79B1MedaxQ_LIUSAmdKfw0yxHy2g/viewform?usp=sf_link" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">お問合せフォーム</a> 
      </p>
    </div>
  );
}
 
export default PrivacyPolicy;
