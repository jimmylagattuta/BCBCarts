class ContactClickMailer < ApplicationMailer
  default from: "jimmy.lagattuta@gmail.com"

  def contact_click(payload)
    @payload = payload || {}

    contact_type = @payload["contact_type"].to_s.presence || "contact"
    label = @payload["label"].to_s.presence || "BCB Carts contact link"

    mail(
      to: "jimmy.lagattuta@gmail.com",
      subject: "BCB Carts #{contact_type.titleize} Click: #{label}"
    )
  end
end