"use client";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { useLocale } from "@/i18n";

export default function PrivacyPage() {
  const { locale } = useLocale();

  return (
    <>
      <Nav />
      <main className="flex-1 px-6 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <header className="mb-12 border-b border-white/5 pb-8 text-center">
            <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              {locale === "zh" ? "EverLex 隐私政策" : "EverLex Privacy Policy"}
            </h1>
            <p className="text-sm text-white/40">
              {locale === "zh"
                ? "最近更新：2026年6月"
                : "Last Updated: June 2026"}
            </p>
          </header>

          <article className="space-y-10 text-white/80">
            {locale === "zh" ? (
              // Chinese Content
              <>
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-400 pl-3">
                    1. 我们收集的信息
                  </h2>
                  <div className="space-y-3 pl-4 text-sm leading-relaxed text-white/70">
                    <p>
                      <strong>本地数据：</strong>EverLex 是一款秉持“本地优先”原则设计的应用。你的学习进度、单词本、笔记等所有核心学习数据均保存在你的设备本地（通过 Apple CoreData/SwiftData 存储），我们无法访问亦不会收集这些本地数据。
                    </p>
                    <p>
                      <strong>网络查询：</strong>当你在 App 中使用 AI 词源分析功能时，应用会向我们的服务器发送查询的英文单词。此类查询是完全匿名的，不会携带任何能够识别你个人身份的信息。
                    </p>
                    <p>
                      <strong>内购与订阅：</strong>我们的服务使用 Apple 的 StoreKit 框架来处理会员订阅与购买。所有的交易支付和交易收据验证均通过 Apple 的官方加密通道安全进行，我们不会收集或存储你的任何支付账号或信用卡信息。
                    </p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-400 pl-3">
                    2. 信息的使用方式
                  </h2>
                  <p className="pl-4 text-sm leading-relaxed text-white/70">
                    我们收集的匿名单词查询信息仅用于向你的设备返回对应的词源解释。我们绝对不会将任何查询数据出售或共享给任何第三方广告商或机构。
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-400 pl-3">
                    3. 数据安全
                  </h2>
                  <p className="pl-4 text-sm leading-relaxed text-white/70">
                    由于你的核心数据均储存在你的个人设备中，其安全性由 iOS/macOS 系统的沙盒机制和设备本身的加密机制提供保障。在进行网络传输时，我们采用行业标准的 HTTPS 传输加密协议，确保通信过程不被侧听。
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-400 pl-3">
                    4. 第三方服务
                  </h2>
                  <p className="pl-4 text-sm leading-relaxed text-white/70">
                    本应用集成了 Apple 的 StoreKit 服务用于应用内购买，该服务受 Apple 隐私政策的约束。除此之外，本 App 没有集成任何第三方数据分析、行为追踪或广告 SDK。
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-400 pl-3">
                    5. 隐私政策的更新
                  </h2>
                  <p className="pl-4 text-sm leading-relaxed text-white/70">
                    我们可能会不时更新本隐私政策。任何更新都将在本页面上公布，且更新仅会围绕更好地保障你的数据隐私而进行。
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-400 pl-3">
                    6. 联系我们
                  </h2>
                  <div className="pl-4 text-sm leading-relaxed text-white/70">
                    <p>如果你对本隐私政策或数据保护有任何疑问，请随时通过以下方式与我们联系：</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>电子邮件：<a href="mailto:support@baomi.app" className="text-blue-400 hover:underline">support@baomi.app</a></li>
                    </ul>
                  </div>
                </section>
              </>
            ) : (
              // English Content
              <>
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-400 pl-3">
                    1. Information We Collect
                  </h2>
                  <div className="space-y-3 pl-4 text-sm leading-relaxed text-white/70">
                    <p>
                      <strong>Local Data:</strong> EverLex is designed with a "local-first" philosophy. Your learning progress, custom vocabulary, study history, and notes are stored strictly on your local device (using Apple's CoreData/SwiftData framework). We do not have access to, nor do we collect, any of this local data.
                    </p>
                    <p>
                      <strong>Network Queries:</strong> When you use our AI etymology feature, the app sends the requested English word to our servers. These queries are entirely anonymous and do not contain any personally identifiable information (PII).
                    </p>
                    <p>
                      <strong>In-App Purchases:</strong> We use Apple's StoreKit framework to handle subscription payments and verification. All transactions and validations are processed securely through Apple's official channels. We do not collect or store your payment details, billing address, or credit card numbers.
                    </p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-400 pl-3">
                    2. How We Use Information
                  </h2>
                  <p className="pl-4 text-sm leading-relaxed text-white/70">
                    The anonymous word query data is used solely to generate and return etymological analysis back to your device. We do not sell, rent, or share any query data with third-party advertisers or brokers.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-400 pl-3">
                    3. Data Security
                  </h2>
                  <p className="pl-4 text-sm leading-relaxed text-white/70">
                    Since your primary study data resides on your own device, its security is protected by iOS/macOS system sandbox mechanisms and device encryption. All network communication with our servers is encrypted using industry-standard HTTPS (TLS).
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-400 pl-3">
                    4. Third-Party Services
                  </h2>
                  <p className="pl-4 text-sm leading-relaxed text-white/70">
                    We integrate Apple's StoreKit for secure in-app purchases, which is subject to Apple's own Privacy Policy. We do not integrate any third-party marketing, analytics, user-tracking, or advertising SDKs.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-400 pl-3">
                    5. Changes to This Policy
                  </h2>
                  <p className="pl-4 text-sm leading-relaxed text-white/70">
                    We may update our Privacy Policy from time to time. Any changes will be posted on this page, and updates will focus strictly on enhancing your data privacy.
                  </p>
                </section>

                <section className="space-y-4">
                  <h2 className="text-xl font-semibold text-blue-400 border-l-4 border-blue-400 pl-3">
                    6. Contact Us
                  </h2>
                  <div className="pl-4 text-sm leading-relaxed text-white/70">
                    <p>If you have any questions or feedback regarding this Privacy Policy, please feel free to contact us:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Email: <a href="mailto:support@baomi.app" className="text-blue-400 hover:underline">support@baomi.app</a></li>
                    </ul>
                  </div>
                </section>
              </>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
