const ContactPage = () => {
  return ( 
    <div className="
      md:mx-auto
      md:max-w-2xl
    ">
      <h2 className="font-bold h2 mt-10 mb-10">お問い合わせ窓口</h2>
      <div className="">
        お問い合わせは、以下のお問合せフォームよりお願いいたします。
        <br />
        
        <p className="mt-4">
          <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdILzYJlYs6joZEZwRSNB79B1MedaxQ_LIUSAmdKfw0yxHy2g/viewform?usp=sf_link" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">お問合せフォーム</a> 
        </p>
      </div>
    </div>
   );
}
 
export default ContactPage;