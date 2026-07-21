from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.cidfonts import UnicodeCIDFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "design-pdfs"
PAGE_SIZE = landscape((210 * mm, 118 * mm))
CN_FONT = "STSong-Light"

pdfmetrics.registerFont(UnicodeCIDFont(CN_FONT))

WORKS = [
    {
        "file": "nebula-tech-brand-proposal.pdf",
        "title": "星云科技品牌视觉提案",
        "category": "品牌设计",
        "accent": colors.HexColor("#6d5dfc"),
        "accent_2": colors.HexColor("#f052b5"),
    },
    {
        "file": "annual-marketing-review.pdf",
        "title": "年度营销复盘报告",
        "category": "商业提案",
        "accent": colors.HexColor("#ef476f"),
        "accent_2": colors.HexColor("#f6ae2d"),
    },
    {
        "file": "spring-pop-up-campaign.pdf",
        "title": "春日快闪活动策划",
        "category": "活动策划",
        "accent": colors.HexColor("#00a8e8"),
        "accent_2": colors.HexColor("#55d6a7"),
    },
    {
        "file": "learning-product-launch-deck.pdf",
        "title": "教育产品发布课件",
        "category": "教育培训",
        "accent": colors.HexColor("#18a999"),
        "accent_2": colors.HexColor("#aacc00"),
    },
    {
        "file": "urban-coffee-franchise-pitch.pdf",
        "title": "城市咖啡品牌招商书",
        "category": "商业提案",
        "accent": colors.HexColor("#5f4733"),
        "accent_2": colors.HexColor("#d08c36"),
    },
    {
        "file": "product-launch-storyline.pdf",
        "title": "新品发布视觉故事线",
        "category": "创意方案",
        "accent": colors.HexColor("#172554"),
        "accent_2": colors.HexColor("#22d3ee"),
    },
]


def draw_cover(pdf: canvas.Canvas, work: dict[str, object]) -> None:
    width, height = PAGE_SIZE
    accent = work["accent"]
    accent_2 = work["accent_2"]

    pdf.setFillColor(colors.HexColor("#f8fafc"))
    pdf.rect(0, 0, width, height, stroke=0, fill=1)

    pdf.setFillColor(accent)
    pdf.rect(0, 0, width * 0.42, height, stroke=0, fill=1)
    pdf.setFillColor(accent_2)
    pdf.circle(width * 0.42, height * 0.68, 54 * mm, stroke=0, fill=1)
    pdf.setFillColor(colors.Color(1, 1, 1, alpha=0.16))
    for index in range(7):
        x = width * 0.08 + index * 18 * mm
        pdf.roundRect(x, height * 0.18 + (index % 2) * 10 * mm, 34 * mm, 72 * mm, 8, stroke=0, fill=1)

    pdf.setFillColor(colors.white)
    pdf.setFont(CN_FONT, 9)
    pdf.drawString(17 * mm, height - 20 * mm, "HT LAB / 设计预览")
    pdf.setFont(CN_FONT, 24)
    pdf.drawString(17 * mm, height - 38 * mm, str(work["category"]))
    pdf.setFont(CN_FONT, 8)
    pdf.drawString(17 * mm, 18 * mm, "在设计空间中打开预览")

    pdf.setFillColor(colors.HexColor("#0f172a"))
    pdf.setFont(CN_FONT, 24)
    title_lines = split_title(str(work["title"]))
    for index, line in enumerate(title_lines):
      pdf.drawString(width * 0.50, height - (35 + index * 12) * mm, line)

    pdf.setStrokeColor(colors.HexColor("#cbd5e1"))
    pdf.setLineWidth(0.8)
    pdf.line(width * 0.50, height * 0.44, width - 20 * mm, height * 0.44)

    pdf.setFillColor(colors.HexColor("#475569"))
    pdf.setFont(CN_FONT, 10)
    body = [
        "用于作品集预览测试的精简 PDF 占位稿。",
        "弹窗可以在不离开页面的情况下查看作品。",
        "后续可替换为真实客户项目或完整提案。",
    ]
    body_lines = wrap_lines(pdf, body, width * 0.44, CN_FONT, 10)
    for index, line in enumerate(body_lines):
        pdf.drawString(width * 0.50, height * 0.41 - index * 6.2 * mm, line)

    pdf.setFillColor(accent)
    pdf.roundRect(width * 0.50, 10 * mm, 48 * mm, 13 * mm, 6.5, stroke=0, fill=1)
    pdf.setFillColor(colors.white)
    pdf.setFont(CN_FONT, 8)
    pdf.drawCentredString(width * 0.50 + 24 * mm, 15.2 * mm, "PDF 预览")


def split_title(title: str) -> list[str]:
    words = title.split()
    lines: list[str] = []
    current = ""
    for word in words:
        next_line = f"{current} {word}".strip()
        if len(next_line) > 25 and current:
            lines.append(current)
            current = word
        else:
            current = next_line
    if current:
        lines.append(current)
    return lines


def wrap_lines(
    pdf: canvas.Canvas,
    paragraphs: list[str],
    max_width: float,
    font_name: str,
    font_size: int,
) -> list[str]:
    lines: list[str] = []
    for paragraph in paragraphs:
        current = ""
        for word in paragraph.split():
            next_line = f"{current} {word}".strip()
            if current and pdf.stringWidth(next_line, font_name, font_size) > max_width:
                lines.append(current)
                current = word
            else:
                current = next_line
        if current:
            lines.append(current)
    return lines


def create_pdf(work: dict[str, object]) -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUTPUT_DIR / str(work["file"])
    pdf = canvas.Canvas(str(path), pagesize=PAGE_SIZE)
    pdf.setTitle(str(work["title"]))
    draw_cover(pdf, work)
    pdf.showPage()
    pdf.save()


def main() -> None:
    for work in WORKS:
        create_pdf(work)
    print(f"Created {len(WORKS)} PDF previews in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
