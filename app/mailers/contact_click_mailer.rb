class ContactClickMailer < ApplicationMailer
  default from: ENV.fetch("MAILER_FROM", "no-reply@bcbcarts.com")

  def contact_click(payload)
    @payload = payload || {}

    contact_type = @payload["contact_type"].to_s.presence || "contact"
    label = @payload["label"].to_s.presence || "BCB Carts contact link"

    mail(
      to: alert_recipient,
      subject: "BCB Carts #{contact_type.titleize} Click: #{label}"
    )
  end

  private

  def alert_recipient
    ENV.fetch("BCB_ALERT_EMAIL", "mebcb@yahoo.com")
  end
end