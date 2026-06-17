# Preview all emails at http://localhost:3000/rails/mailers/turo_click_mailer
class TuroClickMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/turo_click_mailer/turo_click_email
  def turo_click_email
    TuroClickMailer.turo_click_email
  end

end
