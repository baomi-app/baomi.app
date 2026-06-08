import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EverLex — Privacy Policy",
  description: "Privacy policy for the EverLex application.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 text-white/80 select-text">
      <h1 className="text-3xl font-bold tracking-tight text-white border-b border-white/10 pb-4 mb-6">
        EverLex Privacy Policy
      </h1>
      <p className="text-xs text-white/40 mb-8">Last Updated: June 2026</p>

      <p className="text-sm leading-relaxed text-white/70 mb-6">
        EverLex is designed as a local-first application. Your privacy is important to us, and we are committed to protecting it through minimal data collection and industry-standard security practices.
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
      <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed text-white/70 mb-6 pl-2">
        <li><strong>Local Data:</strong> All your study progress, vocabulary notebooks, notes, and history are stored locally on your device (using CoreData/SwiftData). We do not collect or upload this data.</li>
        <li><strong>AI Queries:</strong> When you request AI-powered etymology analysis, the queried English word is sent to our servers anonymously. No personal or device identifiers are attached to these requests.</li>
        <li><strong>In-App Purchases:</strong> Subscription payments and purchases are handled securely via Apple StoreKit. We do not collect or store your payment card details or billing credentials.</li>
      </ul>

      <h2 className="text-lg font-semibold text-white mt-8 mb-4">2. Data Usage</h2>
      <p className="text-sm leading-relaxed text-white/70 mb-6">
        The anonymous word queries are used solely to fetch and return etymology results. We do not track users, nor do we sell, rent, or share your data with any third-party advertisers or brokers.
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-4">3. Data Security</h2>
      <p className="text-sm leading-relaxed text-white/70 mb-6">
        Your local data is protected by iOS/macOS system sandboxing and local device encryption. All network communication is securely encrypted over HTTPS (TLS).
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-4">4. Contact Us</h2>
      <p className="text-sm leading-relaxed text-white/70 mb-12">
        If you have any questions regarding this Privacy Policy, feel free to contact us at: <a href="mailto:support@baomi.app" className="text-blue-400 hover:underline">support@baomi.app</a>
      </p>

      <hr className="border-white/10 my-12" />

      <h1 className="text-3xl font-bold tracking-tight text-white border-b border-white/10 pb-4 mb-6">
        EverLex 隐私政策
      </h1>
      <p className="text-xs text-white/40 mb-8">最近更新：2026年6月</p>

      <p className="text-sm leading-relaxed text-white/70 mb-6">
        EverLex 是一款本地优先的应用。我们致力于通过最少的数据收集和行业标准的安全保障来保护您的隐私权。
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-4">1. 我们收集的信息</h2>
      <ul className="list-disc list-inside space-y-2 text-sm leading-relaxed text-white/70 mb-6 pl-2">
        <li><strong>本地数据：</strong> 您的学习进度、单词本、笔记及历史记录全部保存在您本地的设备上（使用 CoreData/SwiftData）。我们不会收集、存储或上传这些本地数据。</li>
        <li><strong>AI 词源查询：</strong> 当您使用 AI 词源分析功能时，系统会匿名发送查询的单词至我们的服务器。这些查询不带有任何可识别您个人身份的设备或用户标识符。</li>
        <li><strong>应用内购买：</strong> 会员订阅及支付通过 Apple StoreKit 进行安全处理。我们不收集也不存储您的支付卡或账单账户信息。</li>
      </ul>

      <h2 className="text-lg font-semibold text-white mt-8 mb-4">2. 数据使用</h2>
      <p className="text-sm leading-relaxed text-white/70 mb-6">
        匿名的单词查询数据仅用于获取并返回词源分析结果。我们不会跟踪用户，也不会将您的任何信息出售、共享或披露给第三方广告商或机构。
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-4">3. 数据安全</h2>
      <p className="text-sm leading-relaxed text-white/70 mb-6">
        您的本地数据受 iOS/macOS 系统沙盒机制与设备加密保护。所有网络传输均通过行业标准的 HTTPS（TLS）安全加密协议进行。
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-4">4. 联系我们</h2>
      <p className="text-sm leading-relaxed text-white/70 mb-6">
        如果您对本隐私政策有任何疑问，请通过电子邮件联系我们：<a href="mailto:support@baomi.app" className="text-blue-400 hover:underline">support@baomi.app</a>
      </p>
    </main>
  );
}
