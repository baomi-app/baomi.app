import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

const POP_SLUG = "pop";
const LAST_UPDATED_EN = "June 11, 2026";
const LAST_UPDATED_ZH = "2026年6月11日";
const PRIVACY_TITLE = "Pop Privacy Policy / Pop 隐私政策";
const PRIVACY_DESCRIPTION =
  "Privacy policy for the Pop macOS screenshot application. Pop macOS 截图应用隐私政策。";

type PrivacyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [{ slug: POP_SLUG }];
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== POP_SLUG) {
    return { title: "Not found" };
  }

  return {
    title: PRIVACY_TITLE,
    description: PRIVACY_DESCRIPTION,
    openGraph: {
      title: PRIVACY_TITLE,
      description: PRIVACY_DESCRIPTION,
    },
  };
}

export default async function AppPrivacyPage({ params }: PrivacyPageProps) {
  const { slug } = await params;
  if (slug !== POP_SLUG) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-16 text-white/80 sm:py-20">
          <article className="select-text">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">
              Privacy Policy
            </p>
            <h1 className="border-b border-white/10 pb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pop Privacy Policy
            </h1>
            <p className="mt-4 text-xs text-white/40">
              Last Updated: {LAST_UPDATED_EN}
            </p>

            <p className="mt-8 text-sm leading-relaxed text-white/70">
              Pop is a local-first macOS screenshot tool. It is designed to
              capture, annotate, copy, save, and recognize text on your device
              without sending your screenshots or OCR results to baomi.
            </p>

            <h2 className="mt-8 mb-4 text-lg font-semibold text-white">
              1. Information We Collect
            </h2>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/70">
              <li>
                <strong>Screenshots and annotations:</strong> Captures,
                annotations, clipboard images, and saved files remain on your
                Mac or in the location you choose. We do not collect or upload
                them.
              </li>
              <li>
                <strong>OCR text:</strong> Text recognition is performed locally
                on your device using Apple system frameworks. Recognized text is
                not sent to baomi.
              </li>
              <li>
                <strong>App settings:</strong> Preferences such as hotkeys,
                launch-at-login, and local auto-save settings are stored locally
                by the app and macOS.
              </li>
              <li>
                <strong>Website and download traffic:</strong> If you visit
                baomi.app or download Pop through GitHub, those services may
                process standard request logs under their own policies. Pop
                itself does not include advertising trackers.
              </li>
            </ul>

            <h2 className="mt-8 mb-4 text-lg font-semibold text-white">
              2. macOS Permissions
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              macOS may ask you to grant permissions such as Screen Recording so
              Pop can capture the windows, regions, or screens you select.
              These permissions are used only to provide the features you
              enable in Pop.
            </p>

            <h2 className="mt-8 mb-4 text-lg font-semibold text-white">
              3. Data Usage and Sharing
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              We do not sell, rent, or share your screenshots, annotations, OCR
              results, or local app settings with advertisers or data brokers.
              We do not use this information to track you across apps or
              websites.
            </p>

            <h2 className="mt-8 mb-4 text-lg font-semibold text-white">
              4. Data Security
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              Pop relies on macOS local storage, app sandboxing, and system
              security protections. You remain in control of where exported
              files are saved and how they are shared.
            </p>

            <h2 className="mt-8 mb-4 text-lg font-semibold text-white">
              5. Contact Us
            </h2>
            <p className="mb-12 text-sm leading-relaxed text-white/70">
              If you have questions about this Privacy Policy, contact us at{" "}
              <a
                href="mailto:support@baomi.app"
                className="text-blue-400 transition-colors hover:text-blue-300 hover:underline"
              >
                support@baomi.app
              </a>
              .
            </p>
          </article>

          <hr className="my-12 border-white/10" />

          <article className="select-text">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">
              隐私政策
            </p>
            <h1 className="border-b border-white/10 pb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pop 隐私政策
            </h1>
            <p className="mt-4 text-xs text-white/40">
              最近更新：{LAST_UPDATED_ZH}
            </p>

            <p className="mt-8 text-sm leading-relaxed text-white/70">
              Pop 是一款本地优先的 macOS 截图工具。它用于在您的设备上完成截图、标注、复制、保存和文字识别，不会将您的截图或 OCR 识别结果发送给 baomi。
            </p>

            <h2 className="mt-8 mb-4 text-lg font-semibold text-white">
              1. 我们收集的信息
            </h2>
            <ul className="mb-6 list-disc space-y-2 pl-5 text-sm leading-relaxed text-white/70">
              <li>
                <strong>截图与标注：</strong>
                截图、标注内容、剪贴板图片以及保存的文件会保留在您的 Mac 或您选择的位置。我们不会收集或上传这些内容。
              </li>
              <li>
                <strong>OCR 文本：</strong>
                文字识别在您的设备本地通过 Apple 系统框架完成。识别出的文字不会发送给 baomi。
              </li>
              <li>
                <strong>应用设置：</strong>
                快捷键、开机自启、本地自动保存等偏好设置由应用和 macOS 保存在本地。
              </li>
              <li>
                <strong>网站与下载访问：</strong>
                当您访问 baomi.app 或通过 GitHub 下载 Pop 时，相关服务可能会根据其自身政策处理标准请求日志。Pop 应用本身不包含广告追踪器。
              </li>
            </ul>

            <h2 className="mt-8 mb-4 text-lg font-semibold text-white">
              2. macOS 权限
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              macOS 可能会要求您授予屏幕录制等权限，以便 Pop 捕获您选择的窗口、区域或屏幕。这些权限仅用于提供您在 Pop 中启用的功能。
            </p>

            <h2 className="mt-8 mb-4 text-lg font-semibold text-white">
              3. 数据使用与共享
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              我们不会向广告商或数据经纪商出售、出租或共享您的截图、标注、OCR 结果或本地应用设置。我们也不会使用这些信息跨应用或网站追踪您。
            </p>

            <h2 className="mt-8 mb-4 text-lg font-semibold text-white">
              4. 数据安全
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              Pop 依赖 macOS 的本地存储、应用沙盒和系统安全保护。导出文件保存在哪里、如何共享，始终由您自己控制。
            </p>

            <h2 className="mt-8 mb-4 text-lg font-semibold text-white">
              5. 联系我们
            </h2>
            <p className="text-sm leading-relaxed text-white/70">
              如果您对本隐私政策有任何疑问，请通过电子邮件联系我们：
              <a
                href="mailto:support@baomi.app"
                className="text-blue-400 transition-colors hover:text-blue-300 hover:underline"
              >
                support@baomi.app
              </a>
              。
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
